import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { styles } from '../styles/style'
import { useHistory } from 'react-router-native'
const backIcon = require('../../assets/back-arrow.png')

export default function backButton(props) {
    const { route ,jwt} = props
    const history = useHistory()
    return (
        <View style={styles.backBar}>
            <TouchableOpacity onPress={() => {
                history.push({
                    pathname:route,
                    state:{ jwt:jwt}
                })
            }}>

                <Image
                    source={backIcon}
                    style={[styles.loginIcon, { tintColor: 'white' }]}

                ></Image>
            </TouchableOpacity>
        </View>
    )
}
