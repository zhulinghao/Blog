<template>
    <div class="main_header_block">
        <el-row>
            <el-col :span="3" class="main_header_item"><router-link class="main_header_link" to="/write"><i class="el-icon-edit-outline" style="margin-right: 5px"></i>写文章</router-link></el-col>
        </el-row>       
    </div> 
</template>

<script>
    export default {
        data() {
            return {

            };
        }
    }
</script>
<style>
    .main_header_block {
        padding: 10px 20px;
        background: #fff;
        margin-bottom: 10px;
        border: 1px solid #e6ebf5;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    .main_header_link {
        color: #2d2f33;
        text-decoration: none;
    }
    .main_header_link:hover {
        color: #409EFF;
    }
</style>