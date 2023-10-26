<template>
    <div class="bg-emerald-600  min-h-52 w-full p-6 pb-36 mt-24 navbar-animated">
        <!-- <img src="/BEARSHOP-BAG.svg" alt="Logo" class="h-16 w-32 mr-2 mb-4" /> -->
        <div class="flex items-center">
        <div class="text-white text-xl font-bold mt-6 mb-4 flex"><img src="/LOGO.svg" class="mr-2"/></div>
      </div>
        <!-- Footer Links -->
        <div class="flex justify-between mt-4 text-white font-bold">
            <!-- Information Links -->
            <div class="w-1/3">
                <ul>
                    <li class="mb-2"><a href="/about" class="hover:text-gray-300">About This</a></li>
                    <li class="mb-2"><a href="/contact" class="hover:text-gray-300">Contact</a></li>
                </ul>
            </div>

            <!-- Social Media Links -->
            <div class="w-1/3">
                <ul>
                    <li class="mb-2">
                        <a href="https://github.com/gglaine" class="hover:text-gray-300">
                            <i class="fab fa-facebook"></i> Github
                        </a>
                    </li>
                    <li class="mb-2">
                        <a href="https://www.guillaumelaine.com/" class="hover:text-gray-300">
                            <i class="fab fa-twitter"></i> Portfolio
                        </a>
                    </li>
                    <li>
                        <a href="#" class="hover:text-gray-300">
                            <i class="fab fa-instagram"></i> Instagram
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Copyright -->
        <div class="mt-8 text-white font-light">
            <p> &copy; {{ new Date().getFullYear() }}</p>
            <p>Made with 💛 by Guillaume Lainé</p>
        </div>
    </div>    
</template>


<script lang="ts" setup>
</script>