import { bindable, containerless } from 'aurelia-framework';
import {
    default as Clipboard
} from 'clipboard';
import {
    default as clipboard
} from 'clipboard-js';

@containerless
export class EmBlogSharePptContent {

    @bindable id;

    @bindable shareId;

    idChanged(newValue, oldValue) {
        this._getBlog();
    }

    shareIdChanged(newValue, oldValue) {
        this._getBlog();
    }

    attached() {
        new Clipboard('.em-blog-share-ppt-content .tms-clipboard')
            .on('success', function(e) {
                toastr.success('复制到剪贴板成功!');
            }).on('error', function(e) {
                toastr.error('复制到剪贴板失败!');
            });

        $('.em-blog-share-ppt-content').on('click', 'code[data-code]', function(event) {
            if (event.ctrlKey) {
                event.stopImmediatePropagation();
                event.preventDefault();
                clipboard.copy($(event.currentTarget).attr('data-code')).then(
                    () => { toastr.success('复制到剪贴板成功!'); },
                    (err) => { toastr.error('复制到剪贴板失败!'); }
                );
            }
        });

        $('.em-blog-share-ppt-content').on('click', '.pre-code-wrapper', function(event) {
            if (event.ctrlKey) {
                event.stopImmediatePropagation();
                event.preventDefault();
                clipboard.copy($(event.currentTarget).find('i[data-clipboard-text]').attr('data-clipboard-text')).then(
                    () => { toastr.success('复制到剪贴板成功!'); },
                    (err) => { toastr.error('复制到剪贴板失败!'); }
                );
            }
        });

        if (_.includes(wurl(), '?read')) { // read
            $('.ppt-dimmer').dimmer('show');
        }
    }

    _getBlog() {

        if (!this.id && !this.shareId) {
            return;
        }

        let url = '';

        if (this.shareId) {
            url = `/free/blog/share/${this.shareId}`;
        } else {
            url = `/free/home/blog/${this.id}`;
            if (this.sid) {
                url = `/free/space/home/blog/${this.id}`;
            }
        }

        $.get(url, (data) => {
            if (!data.success) {
                toastr.error(data.data);
            } else {
                this.blog = this.shareId ? data.data : data.data.blog;
            }
        });
    }

}
