import { bindable, containerless } from 'aurelia-framework';

@containerless
export class EmBlogContent {

    @bindable id;

    idChanged(newValue, oldValue) {
        this._getBlog();
    }

    _getBlog() {
        if (!this.id) {
            return;
        }

        $.get(`/free/home/blog/${this.id}`, (data) => {
            if (!data.success) {
                toastr.error(data.data);
            } else {
                this.blogInfo = data.data;
                ea.publish(nsCons.EVENT_LANDING_BLOG_DIR, {
                    mkRef: this.mkRef
                });
            }
        });
    }
}
