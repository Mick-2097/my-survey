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
  const isError = ref(false)
  const errorMessage = ref('')

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
  const updateName = () => {
    updateProfile(getAuth().currentUser, {
      displayName: name.value
    })
      .then(() => {
        console.log('name updated')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const login = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
      .then((data) => {
        UID.value = data.user.uid
        name.value = data.user.displayName
        isError.value = false
        router.push('/home')
      })
      .catch((error) => {
        isError.value = true
        errorMessage.value = error.message
        console.log(error.message)
      })
  }

  const logOut = () => {
    signOut(getAuth()).then(() => {
      UID.value = ''
      name.value = ''
      console.log('Signed out')
      router.push('/login')
    })
  }

  return {
    name,
    email,
    password,
    UID,
    isError,
    errorMessage,
    registerUser,
    updateName,
    login,
    logOut
  }
})
