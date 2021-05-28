import React, { useEffect, useState } from 'react'
import { Text, View, Image, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import { styles } from '../styles/style'
import axios from 'axios'
import getInfoAboutCurrenct from '../data/GetData'
import Loading from '../shared/Loading'
import CryptoItems from './CryptoItems'
const { height, width } = Dimensions.get('screen')
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getItem } from '../data/LocalStorage'
import jwt_decode from 'jwt-decode';
import { API_URL, API_HEROKU } from '@env'
import * as SecureStore from 'expo-secure-store';
const userImage = require('../../assets/user-icon.png')
import { useHistory } from 'react-router-native'


export default function CryptoInfo(props) {

    const history = useHistory()
    const { jwt } = props.history.location.state
    // console.log(jwt);
    const [currencyInfo, setCurrencyInfo] = useState()
    const [coin, setCoin] = useState([])
    const [user, setUser] = useState({})
    const [token, setToken] = useState(jwt)



    async function getData() {
        axios.get('https://api.coingecko.com/api/v3/coins/?per_page=10&page=1')
            .then(response => {
                setCoin(response.data)
            })
            .catch(err => console.log(err))
    }

    async function getUser() {
        if (token) {


            axios.get(API_HEROKU + 'user', {
                headers: {
                    'auth-token': token
                }
            })
                .then(response => {
                    setUser(response.data)
                    getInfoAboutCurrenct(response.data.user.localCrncy, setCurrencyInfo)

                })

                .catch(error => {
                    console.log(error);
                })
        } else {
            console.log('token not found');
            history.push('/')
        }
    }

    useEffect(() => {
        getUser()

        getData()

    }, [])

    return (

        <View style={{ flex: 1, width: width }}>

            <View style={styles.container}>

                {
                    coin && coin.length > 0 && currencyInfo && user ?

                        <ScrollView>

                            <View style={styles.serctionAccountIcon}>
                                <TouchableOpacity style={styles.accountBtn}
                                    onPress={() => 
                                            {
                                                history.push({
                                                    pathname: '/account',
                                                    state: { jwt: jwt, user: user }
                                                })
                                            }
                                    }
                                    
                                    >
                                    <Image
                                        style={[styles.img, { tintColor: "white", width: 30, height: 30 }]}
                                        source={userImage}
                                    />
                                </TouchableOpacity>
                            </View>

                            {coin.map(cn => (

                                <CryptoItems coinList={cn} key={cn.id} curInfo={currencyInfo}
                                    jwt={token}
                                    user={user}
                                />
                            ))
                            }

                        </ScrollView>
                        :
                        <Loading title="get information"></Loading>
                }
            </View>
        </View>

    )
}
