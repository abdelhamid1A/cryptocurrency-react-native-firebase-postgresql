import React,{ useState,useEffect} from 'react'
import { View, Text,Dimensions ,TouchableOpacity} from 'react-native'
import BackButton from '../shared/backButton';
import {LineChart} from 'react-native-chart-kit'
import {styles} from '../styles/style'
import Loading from '../shared/Loading';
import axios from 'axios'
import { useHistory } from 'react-router-native'



export default function Statistic(props) {
    const history = useHistory()
    const [crypto,setCrypto] = useState() 
    const [per,setPer] = useState() 
    const duration = ["1y", "60d", "30d", "14d", "7d","24h","1h",]
    const pourcent = []
    const {jwt,id,user,coinList} = props.history.location.state 
    function getData(name){
        axios.get('https://api.coingecko.com/api/v3/coins/'+name)
        .then(response=>{
            const {data} = response
            for (let i = 0; i < duration.length; i++) {
                pourcent.push(parseFloat(data.market_data['price_change_percentage_'+duration[i]+'_in_currency'].usd))
                
            }
            
            setPer(pourcent)
            // setCrypto(response.data)
        })
        .catch(err=>console.log(err))
    }
    useEffect(() => {
        getData(id)
    }, [])
    console.log(user);
    // console.log(coinList);
    return (
        <View style={styles.container}>
            {per && per 
            ?
            <>
            <BackButton 
            route='/info' 
            jwt={jwt}
            
            />
            <Text style={styles.text,[{fontSize:25,color:'#b98a56'}]}>{id}</Text>
            <LineChart
    data={{
      labels: ["1y", "60d", "30d", "14d", "7d","24H","1H",],
      datasets: [ {
          data: per 
        }
      ]
    }}
    width={Dimensions.get("window").width / 1.1} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} 
    chartConfig={{
      backgroundColor: "#e26a00",
    //   backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // 
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  /> 
  <TouchableOpacity style={styles.buyBtn}
  onPress={() => history.push({
    pathname: '/buy',
    state: { jwt: jwt,id: coinList,user:user,coinList:coinList}
})}
  >

  <Text style={{fontSize:25,color:'#fff'}}>Buy</Text>
  </TouchableOpacity>
  </>
  :
  <Loading title="get statistic"/>
}
        </View>
    )
}
