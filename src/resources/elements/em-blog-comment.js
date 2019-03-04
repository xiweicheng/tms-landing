import { bindable, containerless } from 'aurelia-framework';

@containerless
export class EmBlogComment {

    @bindable id;

    @bindable shareId;

    // isSuper;
    // loginUser;

    // bind(bindingCtx, overrideCtx) {
    //     $.get('/admin/user/loginUser', (data) => {
    //         if (data.success) {
    //             this.loginUser = data.data;
    //             this.isSuper = utils.isSuperUser(this.loginUser);
    //             this.isAdmin = utils.isAdminUser(this.loginUser);
    //         }
    //     }).always(() => {});
    // }

    idChanged(newValue, oldValue) {
        this._getComments();
    }

    shareIdChanged(newValue, oldValue) {
        this._getComments();
    }

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        this._getComments();
    }

    _getComments() {

        let url = `/free/home/blog/${this.id}/comments`;

        if (this.shareId) {
            url = `/free/blog/share//${this.shareId}/comments`;
        }

        $.get(url, {
            page: 0,
            size: 1000
        }, (data) => {
            if (data.success) {
                this.comments = data.data.content;
            } else {
                toastr.error(data.data);
            }
        });
    }
}
