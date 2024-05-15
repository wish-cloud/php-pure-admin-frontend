<script setup lang="ts">
import { ref, watch } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { IconSelect } from "@/components/ReIcon";
import Segmented from "@/components/ReSegmented";
import {
  menuTypeOptions,
  isShowOptions,
  fixedTagOptions,
  keepAliveOptions,
  hiddenTagOptions,
  showParentOptions,
  frameLoadingOptions
} from "./utils/enums";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: 0,
    menuType: "menu",
    parentId: 0,
    title: "",
    name: "",
    path: "",
    component: "",
    rank: 99,
    redirect: "",
    icon: "",
    extraIcon: "",
    enterTransition: "",
    leaveTransition: "",
    activePath: "",
    frameSrc: "",
    frameLoading: true,
    keepAlive: false,
    hiddenTag: false,
    fixedTag: false,
    isShow: true,
    showParent: false
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
const higherMenuOptions = ref(props.higherMenuOptions);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-row :gutter="30">
      <re-col>
        <el-form-item label="菜单类型">
          <Segmented
            :options="menuTypeOptions"
            :modelValue="newFormInline.menuType"
            @change="
              ({ option: { value } }) => {
                newFormInline.menuType = value;
              }
            "
          />
        </el-form-item>
      </re-col>

      <re-col>
        <el-form-item label="上级菜单">
          <el-cascader
            v-model="newFormInline.parentId"
            class="w-full"
            :options="higherMenuOptions"
            :props="{
              value: 'id',
              label: 'title',
              emitPath: false,
              checkStrictly: true
            }"
            clearable
            filterable
            placeholder="请选择上级菜单"
          >
            <template #default="{ node, data }">
              <span>{{ data.title }}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
          </el-cascader>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          :label="newFormInline.menuType === 'action' ? '权限名称' : '菜单名称'"
          prop="title"
        >
          <el-input
            v-model="newFormInline.title"
            clearable
            placeholder="请输入显示名称"
          />
        </el-form-item>
      </re-col>
      <re-col
        v-if="newFormInline.menuType !== 'action'"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="路由名称" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入路由名称"
          />
        </el-form-item>
      </re-col>

      <re-col
        v-if="newFormInline.menuType !== 'action'"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="路由路径" prop="path">
          <el-input
            v-model="newFormInline.path"
            clearable
            placeholder="请输入路由路径"
          />
        </el-form-item>
      </re-col>
      <re-col
        v-show="newFormInline.menuType === 'menu'"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="组件路径">
          <el-input
            v-model="newFormInline.component"
            clearable
            placeholder="请输入组件路径"
          />
        </el-form-item>
      </re-col>

      <re-col
        v-show="newFormInline.menuType !== 'action'"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="菜单排序">
          <el-input-number
            v-model="newFormInline.rank"
            class="!w-full"
            :min="1"
            :max="9999"
            controls-position="right"
          />
        </el-form-item>
      </re-col>
      <re-col
        v-show="newFormInline.menuType === 'menu'"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="路由重定向">
          <el-input
            v-model="newFormInline.redirect"
            clearable
            placeholder="请输入默认跳转地址"
          />
        </el-form-item>
      </re-col>

      <re-col
        v-show="newFormInline.menuType !== 'action'"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="菜单图标">
          <IconSelect v-model="newFormInline.icon" class="w-full" />
        </el-form-item>
      </re-col>
      <re-col
        v-show="newFormInline.menuType !== 'action'"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="右侧图标">
          <el-input
            v-model="newFormInline.extraIcon"
            clearable
            placeholder="菜单名称右侧的额外图标"
          />
        </el-form-item>
      </re-col>

      <re-col
        v-show="newFormInline.menuType === 'menu'"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="菜单激活">
          <el-input
            v-model="newFormInline.activePath"
            clearable
            placeholder="请输入需要激活的菜单"
          />
        </el-form-item>
      </re-col>
      <re-col
        v-if="newFormInline.menuType === 'action'"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <!-- 按钮级别权限设置 -->
        <el-form-item label="权限标识" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入权限标识"
          />
        </el-form-item>
      </re-col>

      <re-col
        v-show="newFormInline.menuType === 'iframe'"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <!-- iframe -->
        <el-form-item label="链接地址">
          <el-input
            v-model="newFormInline.frameSrc"
            clearable
            placeholder="请输入 iframe 链接地址"
          />
        </el-form-item>
      </re-col>
      <re-col
        v-if="newFormInline.menuType === 'iframe'"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="加载动画">
          <Segmented
            :modelValue="newFormInline.frameLoading"
            :options="frameLoadingOptions"
            @change="
              ({ option: { value } }) => {
                newFormInline.frameLoading = value;
              }
            "
          />
        </el-form-item>
      </re-col>

      <re-col
        v-show="newFormInline.menuType !== 'action'"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="是否显示">
          <Segmented
            :modelValue="newFormInline.isShow"
            :options="isShowOptions"
            @change="
              ({ option: { value } }) => {
                newFormInline.isShow = value;
              }
            "
          />
        </el-form-item>
      </re-col>
      <!-- <re-col
        v-show="newFormInline.menuType !== 'action'"
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="父级菜单">
          <Segmented
            :modelValue="newFormInline.showParent"
            :options="showParentOptions"
            @change="
              ({ option: { value } }) => {
                newFormInline.showParent = value;
              }
            "
          />
        </el-form-item>
      </re-col> -->

      <re-col
        v-show="
          newFormInline.menuType === 'menu' ||
          newFormInline.menuType === 'iframe'
        "
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="缓存页面">
          <Segmented
            :modelValue="newFormInline.keepAlive"
            :options="keepAliveOptions"
            @change="
              ({ option: { value } }) => {
                newFormInline.keepAlive = value;
              }
            "
          />
        </el-form-item>
      </re-col>

      <re-col
        v-show="
          newFormInline.menuType === 'menu' ||
          newFormInline.menuType === 'iframe'
        "
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="标签页">
          <Segmented
            :modelValue="newFormInline.hiddenTag"
            :options="hiddenTagOptions"
            @change="
              ({ option: { value } }) => {
                newFormInline.hiddenTag = value;
              }
            "
          />
        </el-form-item>
      </re-col>
      <re-col
        v-show="
          newFormInline.menuType === 'menu' ||
          newFormInline.menuType === 'iframe'
        "
        :value="12"
        :xs="24"
        :sm="24"
      >
        <el-form-item label="固定标签页">
          <Segmented
            :modelValue="newFormInline.fixedTag"
            :options="fixedTagOptions"
            @change="
              ({ option: { value } }) => {
                newFormInline.fixedTag = value;
              }
            "
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
