import { bindable, containerless } from 'aurelia-framework';

@containerless
export class EmBlogList {

    @bindable id;

    search = '';

    page = 0;
    size = 10;
    blogs = [];

    constructor() {
        this.doSearch = _.debounce(() => {
            this.blogs = [];
            this.page = 0;
            this._listBlogs();
        }, 500);
    }

    _listBlogs() {
        this.ajax = $.get('/free/home/blog/page/search', {
            search: this.search,
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
