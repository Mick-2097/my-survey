import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword, 
    signOut
} from 'firebase/auth'
export const authData = defineStore('auth-data', () => {

    const router = useRouter()
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const UID = ref({})

    const registerUser = () => {
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            updateProfile(data.user, { displayName: name.value })
            UID.value = data.user.uid
        })
        .then(() => {
            router.push('/home')
        })
        .catch((error) => {
            console.log(error.message)
        })
    }
    
    const login = () => {
        signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            UID.value = data.user.uid
            name.value = data.user.displayName
            router.push('/home')
        })
        .catch((error) => {
            console.log(error.message)
        })
    }

    const logOut = () => {
        signOut(getAuth())
        .then(() => {
            console.log('Signed out')
            router.push('/login')
        })
    }
    return {
        name,
        email,
        password,
        UID,
        registerUser,
        login,
        logOut
    }
})