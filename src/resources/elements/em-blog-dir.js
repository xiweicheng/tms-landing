import { bindable, containerless } from 'aurelia-framework';

@containerless
export class EmBlogDir {

    mkRef;
    // dirItemIds = [];
    dirHtml = '';

    /**
     * 构造函数
     */
    constructor() {
        this.subscribe = ea.subscribe(nsCons.EVENT_LANDING_BLOG_DIR, (payload) => {
            _.defer(() => {
                this.mkRef = payload.mkRef;
                this._dir();
            });
        });
    }

    unbind() {
        this.subscribe.dispose();
    }

    attached() {
        $('.em-blog-dir').on('click', '.wiki-dir-item', (event) => {
            event.preventDefault();
            $('body').scrollTo(`#${$(event.currentTarget).attr('data-id')}`, 200, {
                offset: 0
            });
        });
    }

    _dir() {
        this.dir = utils.dir($(this.mkRef), 'tms-blog-dir-item-');
        // this.dirItemIds = [];
        if (this.dir) {
            // $(this.dir).find('a.item.wiki-dir-item').each((index, el) => {
            //     this.dirItemIds.push($(el).attr('data-id'));
            // });
            this.dirHtml = this.dir.wrap('<div/>').parent().html();
        }

    }
}
