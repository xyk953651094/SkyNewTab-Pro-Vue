<template>
    <a-space>
        <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                  href="https://github.com/xyk953651094/SkyNewTab-Vue/" target="_blank" type="text"
                  @mouseout="btnMouseOut(fontColor, $event)"
                  @mouseover="btnMouseOver(hoverColor, $event)">
            <template #icon>
                <icon-github/>
            </template>
            产品主页
        </a-button>
        <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor}"
                  href="https://gitlab.com/xyk953651094/SkyNewTab-Vue/" target="_blank" type="text"
                  @mouseout="btnMouseOut(fontColor, $event)"
                  @mouseover="btnMouseOver(hoverColor, $event)">
            <template #icon>
                <icon-gitlab/>
            </template>
            产品主页
        </a-button>
        <a-button :shape="preferenceData.buttonShape" :style="{color: fontColor, cursor: 'default'}" type="text"
                  @mouseout="btnMouseOut(fontColor, $event)"
                  @mouseover="btnMouseOver(hoverColor, $event)">
            <template #icon>
                <icon-info-circle/>
            </template>
            {{"V" + require('../../package.json').version}}
        </a-button>
    </a-space>
</template>

<script setup>
import {IconGithub, IconGitlab, IconInfoCircle} from "@arco-design/web-vue/es/icon";
import {defineProps} from "vue";
import {btnMouseOut, btnMouseOver} from "@/javascripts/publicFunctions";
import {defaultPreferenceData} from "@/javascripts/publicConstants";

const props = defineProps({
    hoverColor: {
        type: String,
        required: true,
        default: () => {
            return ""
        }
    },
    fontColor: {
        type: String,
        required: true,
        default: () => {
            return ""
        }
    },
    preferenceData: {
        type: Object,
        required: true,
        default: () => {
            return defaultPreferenceData
        }
    }
});
</script>

<style scoped>

</style>