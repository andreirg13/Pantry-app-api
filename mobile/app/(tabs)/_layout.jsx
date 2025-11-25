import {Redirect, Stack, Tabs} from "expo-router"
import { useAuth } from '@clerk/clerk-expo'
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from "../../constants/colors"

const TabsLayout = () => {
    const { isSignedIn} = useAuth()

    if(!isSignedIn) return <Redirect href={"/(auth)/sign-in"}/>
    return <Tabs
        screenOptions= {{
            headerShown: false,
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.textLight,
            tabBarStyle: {
                backgroundColor: COLORS.white,
                borderTopColor: COLORS.border,
                borderTopWidth: 1,
                paddingBottom: 8,
                paddingTop: 8,
                height: 80,
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "600",
            },

        }}
        >
        <Tabs.Screen
        name="index"
        options={{
            title:"Home",
            tabBarIcon: ({color,size}) => <Ionicons name="home" size={size}
            color={color} />
        }}
        />

        <Tabs.Screen
        name="pantry"
        options={{
            title:"My pantry",
            tabBarIcon: ({color,size}) => <Ionicons name="restaurant" size={size}
            color={color} />
        }}
        />

        <Tabs.Screen
        name="favorites"
        options={{
            title:"Favorites",
            tabBarIcon: ({color,size}) => <Ionicons name="heart" size={size}
            color={color} />
        }}
        />

        
    </Tabs>  
        

}

export default TabsLayout