import { Link } from 'expo-router'
import { Text, View } from 'react-native'

const onboarding = () => {
  return (
    <View className='flex-1 items-center justify-center bg-white text-ellipsis'>
      <Text className='text-5xl text-dark-200'>
        Onboarding
      </Text>
    </View>
  )
}

export default onboarding

