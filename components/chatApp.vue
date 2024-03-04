<script lang="ts" setup>

    import {collection} from "firebase/firestore"
    import { useFirebaseAuth } from "vuefire";
    import { 
    getRedirectResult, 
    } from 'firebase/auth';

    const user = useCurrentUser();
    const db = useFirestore();
    const auth = useFirebaseAuth()!
    const messages = useCollection(collection(db, "messages"));


</script>

<template>
    <div class="chatApp">
        <template v-if="user">
            <h1>{{ messages }}</h1>
            <h1>{{ messages[0].text }}</h1>
       </template>
        <template v-else>
            <div>sign in</div>
        </template>
    </div>
</template>

<style scoped>
 .chatApp {
    color: white;
    font-family: Arial, Helvetica, sans-serif;
 }
</style>