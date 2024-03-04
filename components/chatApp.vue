<script lang="ts" setup>

    import {addDoc, collection, serverTimestamp} from "firebase/firestore"
    import { useFirebaseAuth } from "vuefire";

    const user = useCurrentUser();
    const db = useFirestore();
    const auth = useFirebaseAuth()!
    const messageRef = collection(db, "messages");
    const messages = useCollection(messageRef);

    function sendMessage(){
        //send message
        addDoc(messageRef, {
            text: "testing text",
            CreateAt: serverTimestamp()
        });
    }

</script>

<template>
    <div class="chatApp">
        <template v-if="user">
            <div v-for="message in messages">
                <p>{{ message.CreateAt.toDate() }}</p>
                <h1>{{ message.text }}</h1>
            </div>
            <input type="text">
            <button @click="sendMessage()">Send</button>
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