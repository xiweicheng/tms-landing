import { bindable, containerless } from 'aurelia-framework';

@containerless
export class EmHome {

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        // $(this.leftSidebarRef).sidebar();
    }

    _getBlogs() {
    	$.get('/free/home/blogs', (data) => {
    		this.blogPage = data.data;
    	});
    }

    /**
     * 在视图模型(ViewModel)展示前执行一些自定义代码逻辑
     * @param  {[object]} params                参数
     * @param  {[object]} routeConfig           路由配置
     * @param  {[object]} navigationInstruction 导航指令
     * @return {[promise]}                      你可以可选的返回一个延迟许诺(promise), 告诉路由等待执行bind和attach视图(view), 直到你完成你的处理工作.
     */
    activate(params, routeConfig, navigationInstruction) {
    	this._getBlogs();
    }
}
