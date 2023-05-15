<template>
    <div class="loader">
        <div class="loader-background"></div>
        <div class="lds-dual-ring"></div>
    </div>
</template>
<style lang="scss" scoped>
    .loader {
        .loader-background {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, .8);
            z-index: 99;
        }
    }

    .lds-dual-ring {
        display: inline-block;
        position: fixed;
        margin-left: 45%;
        margin-top: 20%;
        width: 80px;
        height: 80px;
        z-index: 100;
    }
    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid rgb(255, 255, 255);
        border-color: rgb(255, 255, 255) transparent rgb(255, 255, 255) transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>