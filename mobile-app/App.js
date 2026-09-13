import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Platform, StatusBar } from 'react-native';

const API = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '');
if (!API) throw new Error('EXPO_PUBLIC_API_URL non è configurato in mobile-app/.env.');

async function parseResponse(response) {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.message || `Errore HTTP ${response.status}`);
  return body;
}

export default function App() {
  const [token, setToken] = useState(null);
  const [login, setLogin] = useState({ username: '', password: '' });
  const [data, setData] = useState(null);
  const [screen, setScreen] = useState('home');

  const request = async (path, options = {}, authToken = token) => {
    try {
      const response = await fetch(`${API}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}), ...options.headers } });
      return await parseResponse(response);
    } catch (error) {
      if (error instanceof TypeError) throw new Error(`Impossibile raggiungere il server (${API}).`);
      throw error;
    }
  };

  const refresh = async () => setData(await request('/me'));
  const signIn = async () => {
    try {
      const result = await request('/auth/login', { method: 'POST', body: JSON.stringify(login) }, null);
      const userData = await request('/me', {}, result.token);
      setData(userData); setToken(result.token);
    } catch (error) { Alert.alert('Errore di accesso', error.message); }
  };

  const signOut = () => {
    Alert.alert('Esci', 'Vuoi terminare la sessione?', [
      { text: 'Annulla', style: 'cancel' },
      {
        text: 'Esci',
        style: 'destructive',
        onPress: () => {
          setToken(null);
          setData(null);
          setScreen('home');
          setLogin({ username: '', password: '' });
        },
      },
    ]);
  };

  if (!token || !data) return <SafeAreaView style={s.page}><View style={s.box}><Text style={s.title}>Il mio percorso</Text><Text style={s.subtitle}>Accedi al centro diurno</Text><TextInput style={s.input} placeholder="Username" autoCapitalize="none" value={login.username} onChangeText={(username) => setLogin({ ...login, username })}/><TextInput style={s.input} placeholder="Password" secureTextEntry value={login.password} onChangeText={(password) => setLogin({ ...login, password })}/><TouchableOpacity style={s.button} onPress={signIn}><Text style={s.buttonText}>Accedi</Text></TouchableOpacity></View></SafeAreaView>;

  const target = Math.max(Number(data.goal?.targetPoints) || 100, 1);
  const points = Number(data.user.points) || 0;
  const progress = Math.min(points / target, 1);
  const stages = Array.from({ length: 5 }, (_, index) => Math.round((target / 5) * (index + 1)));

  if (screen === 'progress') return <SafeAreaView style={s.page}><ScrollView><TouchableOpacity style={s.back} onPress={()=>setScreen('home')}><Text style={s.backText}>← Indietro</Text></TouchableOpacity><Text style={s.title}>Il mio percorso</Text><View style={s.card}><Text style={s.points}>{points} / {target}</Text><Text style={s.subtitle}>punti conquistati</Text><View style={s.track}><View style={[s.fill,{width:`${progress * 100}%`}]} /></View><View style={s.stages}>{stages.map((stage,index)=><View style={s.stage} key={stage}><View style={[s.dot,points>=stage&&s.dotDone]}><Text style={s.dotText}>{index+1}</Text></View><Text style={s.stageText}>{stage}</Text></View>)}</View><View style={s.goalBox}><Text style={s.goalTitle}>🏁 {data.goal?.title || 'Traguardo'}</Text><Text>{points >= target ? 'Traguardo raggiunto!' : `Mancano ${Math.max(target-points,0)} punti`}</Text></View></View><TouchableOpacity style={s.outlineButton} onPress={refresh}><Text style={s.outlineText}>Aggiorna punteggio</Text></TouchableOpacity></ScrollView></SafeAreaView>;

  return <SafeAreaView style={s.page}><ScrollView><View style={s.header}><Text style={s.title}>Ciao, {data.user.fullName}</Text><TouchableOpacity style={s.logoutButton} onPress={signOut} accessibilityRole="button" accessibilityLabel="Esci dall'account"><Text style={s.logoutText}>Esci</Text></TouchableOpacity></View><View style={s.card}><Text style={s.points}>{points}</Text><Text>punti conquistati</Text><Text style={s.goal}>{data.goal?.title || 'Traguardo'} · {target} punti</Text></View><TouchableOpacity style={s.outlineButton} onPress={()=>setScreen('progress')}><Text style={s.outlineText}>Vedi il mio percorso</Text></TouchableOpacity><TouchableOpacity style={s.button} onPress={async()=>{try{await request('/me/checkins',{method:'POST'});Alert.alert('Inviato','Il check-in attende approvazione');}catch(error){Alert.alert('Info',error.message)}}}><Text style={s.buttonText}>Fai check-in</Text></TouchableOpacity><Text style={s.heading}>Come ti senti?</Text>{data.moods.map(mood=><TouchableOpacity style={s.option} key={mood.id} onPress={async()=>{try{await request('/me/moods',{method:'POST',body:JSON.stringify({moodId:mood.id})});Alert.alert('Inviato',"Il tuo stato d'animo attende approvazione");}catch(error){Alert.alert('Errore',error.message)}}}><Text>{mood.name}</Text><Text>+{mood.points} punti</Text></TouchableOpacity>)}<Text style={s.heading}>Attività</Text>{data.activities.map(activity=><View style={s.option} key={activity.id}><View style={s.activityText}><Text style={{fontWeight:'bold'}}>{activity.title}</Text><Text>{activity.description}</Text><Text>+{activity.points} punti</Text></View><TouchableOpacity style={s.smallButton} onPress={async()=>{try{await request(`/me/activities/${activity.id}/complete`,{method:'POST'});Alert.alert('Inviata',"L'attività attende approvazione");}catch(error){Alert.alert('Info',error.message)}}}><Text style={s.buttonText}>Completa</Text></TouchableOpacity></View>)}</ScrollView></SafeAreaView>;
}

const s = StyleSheet.create({
  page:{flex:1,backgroundColor:'#fff',padding:22,paddingTop:Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 22 : 22}, box:{marginTop:70}, header:{flexDirection:'row',alignItems:'flex-start',justifyContent:'space-between',gap:12}, title:{fontSize:30,fontWeight:'bold',color:'#4C7F71',marginBottom:8,flex:1}, subtitle:{color:'#617d75',marginBottom:16}, input:{borderWidth:1,borderColor:'#b9d2ca',borderRadius:9,padding:12,marginVertical:7}, button:{backgroundColor:'#4C7F71',padding:14,borderRadius:9,alignItems:'center',marginVertical:10}, buttonText:{color:'#fff',fontWeight:'bold'}, logoutButton:{borderWidth:1,borderColor:'#4C7F71',paddingVertical:10,paddingHorizontal:14,borderRadius:9,minHeight:44,justifyContent:'center'}, logoutText:{color:'#4C7F71',fontWeight:'bold'}, card:{padding:22,borderRadius:16,borderWidth:1,borderColor:'#dceae5',marginVertical:15}, points:{fontSize:32,fontWeight:'bold',color:'#4C7F71'}, goal:{marginTop:15,color:'#617d75'}, heading:{fontSize:21,fontWeight:'bold',color:'#4C7F71',marginTop:24,marginBottom:8}, option:{padding:15,borderWidth:1,borderColor:'#dceae5',borderRadius:12,marginVertical:5,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}, activityText:{flex:1,paddingRight:10}, smallButton:{backgroundColor:'#4C7F71',padding:10,borderRadius:9}, outlineButton:{borderWidth:1,borderColor:'#4C7F71',padding:13,borderRadius:9,alignItems:'center',marginVertical:5}, outlineText:{color:'#4C7F71',fontWeight:'bold'}, back:{marginVertical:12}, backText:{color:'#4C7F71',fontWeight:'bold'}, track:{height:16,backgroundColor:'#dceae5',borderRadius:8,overflow:'hidden',marginTop:18}, fill:{height:'100%',backgroundColor:'#4C7F71'}, stages:{flexDirection:'row',justifyContent:'space-between',marginTop:12}, stage:{alignItems:'center',width:'20%'}, dot:{width:30,height:30,borderRadius:15,backgroundColor:'#dceae5',alignItems:'center',justifyContent:'center'}, dotDone:{backgroundColor:'#4C7F71'}, dotText:{color:'#fff',fontWeight:'bold'}, stageText:{fontSize:11,color:'#617d75',marginTop:4}, goalBox:{marginTop:25,padding:16,backgroundColor:'#eef6f3',borderRadius:12}, goalTitle:{fontWeight:'bold',fontSize:18,color:'#4C7F71',marginBottom:5}
});
