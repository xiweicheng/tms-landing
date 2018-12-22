import { bindable, containerless } from 'aurelia-framework';

@containerless
export class EmBlogList {

    @bindable sid;

    @bindable id;

    search = '';

    page = 0;
    size = 15;
    blogs = [];

    constructor() {
        this.doSearch = _.debounce(() => {
            this.blogs = [];
            this.page = 0;
            this._listBlogs();
        }, 500);
    }

    attached() {
        $(this.ddSearchRef).dropdown({
            onChange: (value, text, $choice) => {
                this.doSearch();
                $(this.searchInputRef).focus();
            }
        });
    }

    _listBlogs() {

        let prefix = $(this.ddSearchRef).dropdown("get value");

        let url = `/free/home/blog/page/search`;
        if (this.sid) {
            url = `/free/space/home/${this.sid}/blog/page/search`;
        }

        this.ajax = $.get(url, {
            search: (this.search ? prefix : '') + this.search,
            size: this.size,
            page: this.page
        }, (data) => {
            this.blogPage = data.data;
            this.blogs.push(...data.data.content);
        });
    }

    moreHandler() {
        this.page++;
        this._listBlogs();
    }

    bind(bindingCtx, overrideCtx) {
        this._listBlogs();
    }

    keyupHandler(event) {
        this.doSearch();
    }

    searchFocusHandler() {
        $(this.searchRemoveRef).show();
    }

    searchBlurHandler() {
        if (!this.search) {
            $(this.searchRemoveRef).hide();
        }
    }

    clearSearchHandler() {
        this.search = '';
        $(this.searchInputRef).focus();
        this.doSearch();
    }
}
