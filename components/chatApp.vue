<script setup>
        
    const user = useCurrentUser();

</script>

<template>
    <div>
        <template v-if="user">
            <div>{{ user.displayName }}</div>
        </template>
        <template v-else>
            <div>sign in</div>
        </template>
    </div>
</template>

<style scoped>
 
</style>