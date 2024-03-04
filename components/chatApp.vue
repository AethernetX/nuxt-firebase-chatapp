<script lang="ts" setup>

    import {addDoc, collection, serverTimestamp} from "firebase/firestore"
    import { useFirebaseAuth } from "vuefire";
    import { ref } from "vue";

    const user = useCurrentUser();
    const db = useFirestore();
    const auth = useFirebaseAuth()!
    const messageRef = collection(db, "messages");
    const messages = useCollection(messageRef);

    const newMessage = ref("");

    function sendMessage(){        
        //send message
        addDoc(messageRef, {
            text: newMessage.value,
            CreateAt: serverTimestamp()
        });

        //empty when done
        newMessage.value == "";
    }

</script>

<template>
    <div class="chatApp">
        <template v-if="user">
            <div v-for="message in messages">
                <p>{{ message.CreateAt.toDate() }}</p>
                <h1>{{ message.text }}</h1>
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
    color: white;
    font-family: Arial, Helvetica, sans-serif;
 }
</style>