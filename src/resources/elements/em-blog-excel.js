import {
    bindable,
    containerless
} from 'aurelia-framework';

@containerless
export class EmBlogExcel {

    @bindable blog;

    baseRes = utils.getResourceBase();

    blogChanged(newValue, oldValue) {
        // newValue && this.init(newValue);
    }

    constructor() {

    }

    init() {
        if (!this.blog) return;
        if (this.blog.editor == 'Excel') {
            let shareId = this.blog.shareId ? this.blog.shareId : '';
            $('.em-blog-excel > iframe').attr('src', `${this.baseRes}page/excel.html?id=${this.blog.id}&shareId=${shareId}&readonly&free&_=${new Date().getTime()}`);
        }
    }

    attached() {
        this.init();
    }

    /**
     * 当数据绑定引擎从视图解除绑定时被调用
     */
    unbind() {}
}
