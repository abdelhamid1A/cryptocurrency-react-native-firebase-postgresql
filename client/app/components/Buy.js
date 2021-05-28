import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { styles } from '../styles/style'
import BackButton from '../shared/backButton'
import {useHistory} from 'react-router-native'
import axios from 'axios'
import { API_URL,API_HEROKU } from '@env';
const { height, width } = Dimensions.get("screen")


export default function Buy(props) {
    const history = useHistory()
    const { jwt, coinList, user } = props.history.location.state
    const [mt, setMt] = useState('')
    const [crpyto, setCrypto] = useState('')
    const cryptoValue = coinList.market_data.current_price[lower(user.user.localCrncy)]
    // console.log(coinList);
    function lower(str) {
        return str.toLowerCase()
    }
    function changeUserCurrencyToCrypto() {
        setCrypto(Number(mt * cryptoValue))
    }
    async function buy(){
        console.log(mt);
        console.log(crpyto);
        console.log(jwt);
        const body={
            "currencyPrice":parseFloat(mt),
            "currencyName":coinList.id,
            "value":crpyto
        }
       await axios.post(API_HEROKU+'wallet/buy',body,{
            headers: {
                'auth-token': jwt
            }
        })
        .then(response =>{
            console.log(response.data);
            history.push({
                pathname: '/account',
                state: { jwt: jwt }
            })
        })
        .catch(err =>console.log(err))
    }
    useEffect(() => {
        changeUserCurrencyToCrypto()
    }, [mt])
    // console.log(jwt);
    return (
        <View style={[styles.container]}>
            <BackButton
                route='/info'
                jwt={jwt}
                style={{ marginBottom: 0 }}
            />

            <View style={{ justifyContent: "space-between", flexDirection: "column", height: height / 1.3, alignItems: "center" }}>
                <View style={styles.buyHeader}>
                    <View style={[styles.buyBtn, { marginTop: 0 }]}>

                        <Text style={{ fontSize: 18, color: "white" }}>{coinList.id}</Text>

                    </View>
                    <View style={[styles.buyBtn, { marginTop: 0 }]}>
                        <Text style={{ fontSize: 18, color: "white" }}>{cryptoValue}</Text>
                    </View>
                </View>


                <TextInput
                    placeholder="MT"
                    placeholderTextColor="#93a6b1"
                    onChangeText={setMt}
                    keyboardType='decimal-pad'
                    style={styles.buyInput}
                />
                <Text style={styles.cryptoValue}>{crpyto} {coinList.id}s</Text>
                <TouchableOpacity style={[styles.buyBtn,{marginTop:0}]}
                    onPress={() => buy()}
                >

                    <Text style={{ fontSize: 25, color: '#fff' }}>Buy</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
