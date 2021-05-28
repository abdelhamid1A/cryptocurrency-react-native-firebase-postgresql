import React from 'react'
import { View, Text ,Dimensions} from 'react-native'
const { height, width } = Dimensions.get("screen")

export default function AccountRows(props) {
    const {data} = props
    // console.log(data);
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: width / 1.2, alignItems: 'center', marginTop: 55, borderTopWidth: 1, borderColor: '#767576', padding: 5 }}>
            <View>
                <Text style={{ color: '#767576', fontSize: 20 }}>{data.cryp_name}</Text>
            </View>
            <View>
                <Text style={{ color: '#767576' }}>{data.wallet_number}</Text>
            </View>
            <View>
                <Text style={{ color: '#c1c68d' }}>{data.value}</Text>
            </View>
        </View>
    )
}
