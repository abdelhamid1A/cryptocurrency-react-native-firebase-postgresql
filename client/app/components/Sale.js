import React,{useState, useEffect} from 'react'
import { View, Text,TextInput ,TouchableOpacity} from 'react-native'
import {styles} from '../styles/style';
import BackButton from '../shared/backButton'
import {Picker} from '@react-native-community/picker';
import axios from 'axios';
import {API_HEROKU} from '@env';
import {useHistory} from 'react-router-native'



export default function Sale(props) {
    const history = useHistory()
    const { jwt , wallets} = props.history.location.state
    const [currencyName, setCurrencyName] = useState(wallets[0].cryp_name);
    const [value, setValue] = useState('');
    const [walletNumber, setWalletNumber] = useState('');
    
    function sell() {
        const body = {
            currencyName,
            value,
            wallet_number:walletNumber
        }
        axios.post(API_HEROKU+'wallet/sell',body,{
            headers: {
                'auth-token': jwt
            }
        })
        // console.log(body);
        .then(response=>{
            console.log(response.data);
            history.push({
                pathname: '/account',
                state: { jwt: jwt }
            })
        })
        .catch(err=>console.log(err))
    }
    console.log(currencyName);
    return (
        <View style={styles.container}>
            <BackButton 
            route='/account'
            jwt={jwt}
            style={{ marginBottom: 0 }}
            />
            <Picker
        selectedValue={currencyName}
        style={[styles.buyInput,{ height: 50, width: 150 ,color:'#93a6b1'}]}
        onValueChange={(itemValue, itemIndex) => setCurrencyName(itemValue)}
        
      >
          {
              wallets && 
              wallets.map((wallet=>(
                <Picker.Item label={wallet.cryp_name} value={wallet.cryp_name} key={wallet.id}/>
              )))
          }
        
        {/* <Picker.Item label="JavaScript" value="js" /> */}
      </Picker>
            <TextInput  placeholder="enter value want to sell " placeholderTextColor="#93a6b1" style={[styles.buyInput,{marginVertical:15,padding:3,color:'white'}]}
            onChangeText={setValue}
            keyboardType='decimal-pad'
            />
            <TextInput  placeholder="enter wallet number want to sell " placeholderTextColor="#93a6b1" style={[styles.buyInput,{marginVertical:15,padding:3,color:'white'}]}
            onChangeText={setWalletNumber}
            autoCapitalize='none'
            />
            <TouchableOpacity style={[styles.buyBtn,{marginTop:0}]}
                    onPress={() => sell()}
                >

                    <Text style={{ fontSize: 25, color: '#fff' }}>sell</Text>
                </TouchableOpacity>
        </View>
    )
}
