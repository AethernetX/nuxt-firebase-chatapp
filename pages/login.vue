<script lang="js">
//we need this for the page redirect function
import { GoogleAuthProvider } from 'firebase/auth';
export const googleAuthProvider = new GoogleAuthProvider();
</script>

<script lang="js" setup>
//see https://vuejs.org/api/sfc-script-setup.html for why we need script setup
import { 
    getRedirectResult,
    signInWithRedirect, 
    signOut 
} from 'firebase/auth';

//even though vuefire is a global library I'm going to import anyways
import {useFirebaseAuth, useCurrentUser,useIsCurrentUserLoaded} from "vuefire";

definePageMeta({
    linkTitle: "login",
    order: 2,
})

const auth = useFirebaseAuth(); //only exists in the client side
const user = useCurrentUser();
const isUserLoaded = useIsCurrentUserLoaded();

//display any errors if any
const error = ref(null);

//user will be redirected to sign in
function signInRedirect(){
    signInWithRedirect(auth, googleAuthProvider).catch((reason) => {
        console.error(`Failed signinRedirect`, reason);
        error.value = reason;
    })
}

//on the client side
onMounted(() => {
    getRedirectResult(auth).catch((reason) => {
        console.error("Failed signinRedirect", reason)
        error.value = reason;
    })
})

const route = useRoute();

</script>

<template>
    <main>
        <h2>Login</h2>

        <ClientOnly>
            <p v-if="!isUserLoaded">Loading...</p>
        </ClientOnly>

        <ErrorBox v-if="error" :error="error" />

        <div v-else-if="route.query.redirect">
            <p>
                Please login to accss {{ route.query.redirect }}.
            </p>
        </div>

        <template v-if="user">
            <div>
                You are currently logged in as: {{ user.displayName }}
            </div>
            <img :src="user.photoURL" />
            <button @click="signOut(auth)">Sign out</button>
        </template>

        <template v-else>
            <button @click="signInRedirect()">Sign in</button>
        </template>

    </main>
</template>

<style scoped>
    * {
        color: #fff;
        font-family: Arial, Helvetica, sans-serif;
    }
</style>