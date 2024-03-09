<script lang="ts" setup>

    import {addDoc, collection, orderBy, query, serverTimestamp} from "firebase/firestore"
    import { useFirebaseAuth } from "vuefire";
    import { ref } from "vue";

    const user = useCurrentUser();
    const db = useFirestore();
    const auth = useFirebaseAuth()!
    const messageRef = collection(db, "messages");
    const q = query(messageRef, orderBy("CreateAt", "asc"));
    const messages = useCollection(q);

    const newMessage = ref("");

    function sendMessage(){        
        //sends message text alongside other useful data
        //send user id and user image url
        addDoc(messageRef, {
            text: newMessage.value,
            CreateAt: serverTimestamp(),
            uid: user.value?.uid,
            pfp: user.value?.photoURL,
        });

        //empty when done
        newMessage.value = "";
    }

</script>

<template>
    <div class="chatApp">
        <template v-if="user">
            <div class="messages">
                <div v-for="message in messages" :class="user.uid == message.uid ? 'userMessage' : 'otherMessage'">
                    <!--assume the use has a pfp-->
                    <img :src="message.pfp" />
                    <p>{{ message.CreateAt.toDate() }}</p>
                    <h1>{{ message.text }}</h1>
                </div>
                <div id="bottom"></div>
            </div>
            
            <form @submit.prevent="sendMessage">
                <input required v-model="newMessage">
                <button>Send</button>
            </form>
            
       </template>
        <template v-else>
            <div>sign in</div>
        </template>
    </div>
</template>

<style scoped>
 .chatApp {
    font-family: Arial, Helvetica, sans-serif;

 }

 .messages {
    overflow-y: scroll;
    height: 500px;
    width: 50%;
    padding: 1rel;
 }

 .userMessage {
    color: #0084ff
 }

 .otherMessage {
    color: #00ff59
 }
</style>