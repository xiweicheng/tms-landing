import {
    bindable,
    containerless
} from 'aurelia-framework';

@containerless
export class EmBlogList {

    @bindable sid;

    @bindable id;

    search = '';

    page = 0;
    size = 15;
    blogs = [];
    blogTree = [];
    blogSize = 0;

    constructor() {
        this.doSearch = _.debounce(() => {
            this.blogs = [];
            this.blogTree = [];
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

        this.size = 15;
        let url = `/free/home/blog/page/search`;
        if (this.sid) {
            this.size = 1000;
            url = `/free/space/home/${this.sid}/blog/page/search`;
        }

        this.ajax = $.get(url, {
            search: (this.search ? prefix : '') + this.search,
            size: this.size,
            page: this.page
        }, (data) => {
            this.blogPage = data.data;
            this.blogSize = data.data.content.length;

            if (this.sid) {
                _.each(data.data.content, blog => {
                    if (!blog.pid) {
                        if (blog.dir) {
                            let dir = _.find(this.blogTree, {
                                id: blog.dir.id
                            });
                            if (dir) {
                                dir.blogs.push(blog);
                            } else {
                                blog.dir.blogs = [blog];
                                this.blogTree.push(blog.dir);
                            }
                        } else {
                            this.blogs.push(blog);
                        }
                    } else {
                        // this.blogs.push(blog);
                    }

                })
            } else {
                this.blogs.push(...data.data.content);
            }
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

    loadChildBlogs(blog) {
        if (!blog.hasChild) return;

        blog._open = !blog._open;
        if (blog._open && !blog._childs) {
            $.get('/free/home/blog/list/by/pid', {
                id: blog.id
            }, (data) => {
                if (data.success) {
                    blog._childs = data.data;
                    blog.hasChild = blog._childs.length > 0;
                } else {
                    toastr.error(data.data);
                }
            });
        }
    }
}
