import { bindable, containerless } from 'aurelia-framework';
import {
    default as Clipboard
} from 'clipboard';
import {
    default as clipboard
} from 'clipboard-js';

@containerless
export class EmBlogContent {

    @bindable sid;

    @bindable id;

    idChanged(newValue, oldValue) {
        this._getBlog();
    }

    attached() {
        new Clipboard('.em-blog-content .tms-clipboard')
            .on('success', function(e) {
                toastr.success('复制到剪贴板成功!');
            }).on('error', function(e) {
                toastr.error('复制到剪贴板失败!');
            });

        $('.em-blog-content').on('click', 'code[data-code]', function(event) {
            if (event.ctrlKey) {
                event.stopImmediatePropagation();
                event.preventDefault();
                clipboard.copy($(event.currentTarget).attr('data-code')).then(
                    () => { toastr.success('复制到剪贴板成功!'); },
                    (err) => { toastr.error('复制到剪贴板失败!'); }
                );
            }
        });

        $('.em-blog-content').on('click', '.pre-code-wrapper', function(event) {
            if (event.ctrlKey) {
                event.stopImmediatePropagation();
                event.preventDefault();
                clipboard.copy($(event.currentTarget).find('i[data-clipboard-text]').attr('data-clipboard-text')).then(
                    () => { toastr.success('复制到剪贴板成功!'); },
                    (err) => { toastr.error('复制到剪贴板失败!'); }
                );
            }
        });
    }

    _getBlog() {
        if (!this.id) {
            return;
        }

        let url = `/free/home/blog/${this.id}`;
        if (this.sid) {
            url = `/free/space/home/blog/${this.id}`;
        }

        $.get(url, (data) => {
            if (!data.success) {
                toastr.error(data.data);
            } else {
                this.blogInfo = data.data;
                ea.publish(nsCons.EVENT_LANDING_BLOG_DIR, {
                    mkRef: this.mkRef
                });
                ea.publish(nsCons.EVENT_BLOG_GOT, this.blogInfo.blog);
            }
        });
    }
}
