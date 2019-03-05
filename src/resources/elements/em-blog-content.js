import { bindable, containerless } from 'aurelia-framework';
import {
    default as Clipboard
} from 'clipboard';
import {
    default as clipboard
} from 'clipboard-js';

@containerless
export class EmBlogContent {

    @bindable blogInfo;

    blogInfoChanged(newValue, oldValue) {

        if (!this.blogInfo) return;

        _.defer(() => {
            ea.publish(nsCons.EVENT_LANDING_BLOG_DIR, {
                mkRef: this.mkRef
            });
        });

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

        $('.ppt-dimmer').click((event) => {
            if ($(event.target).is('.ppt-dimmer')) {
                $('.ppt-dimmer').dimmer('hide');
            }
        });
    }

    pptViewHandler() {
        $('.ppt-dimmer').dimmer('show');
    }
}
