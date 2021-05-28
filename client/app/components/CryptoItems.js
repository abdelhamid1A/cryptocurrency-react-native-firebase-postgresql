import React from 'react'
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { styles } from '../styles/style'
const { height } = Dimensions.get('window');
import { useHistory } from 'react-router-native'


export default function CryptoItems(props) {
    const history = useHistory()
    const { coinList, curInfo,jwt,user } = props
    // console.log(coinLi);
    function lower(str){
      return str.toLowerCase() 
    }
    console.log(coinList.market_data.current_price.usd);
    return (
        <TouchableOpacity onPress={() => history.push({
            pathname: '/statistic',
            state: { jwt: jwt,id: coinList.id,user:user,coinList: coinList}
        })}>
            {/* coinList.market_data.current_price[lower(user.user.localCrncy)] */}
            <View style={styles.section} >
                <Image
                    style={styles.img}
                    source={{ uri: coinList.image.small }}
                />
                <Text style={styles.text}>{coinList.market_data.current_price.usd + ' ' + curInfo.symbol}</Text>
                <Text style={styles.text} >{coinList.name}</Text>
                {/* <Text style={styles.text} >{coinList.market_data.current_price[lower(user.localCrncy)]}</Text> */}
            </View>
        </TouchableOpacity>

    )
}
