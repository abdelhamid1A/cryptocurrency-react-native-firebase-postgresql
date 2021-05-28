import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { styles } from '../styles/style'

export default function Loading(props) {
    const { title } = props
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={[styles.text, { fontSize: 23, color: '#93a6b1' }]}>{title}</Text>
        </View>
    )
    
}
