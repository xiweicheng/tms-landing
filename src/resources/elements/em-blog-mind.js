import {
    bindable,
    containerless
} from 'aurelia-framework';

@containerless
export class EmBlogMind {

    @bindable blog;

    baseRes = utils.getResourceBase();

    blogChanged(newValue, oldValue) {
        // newValue && this.init(newValue);
    }

    constructor() {

    }

    init() {
        if (!this.blog) return;
        if (this.blog.editor == 'Mind') {
            $('.em-blog-mind > iframe').attr('src', `${this.baseRes}page/mind.html?id=${this.blog.id}&readonly&free&_=${new Date().getTime()}`);
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
