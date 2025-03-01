const { chromium } = require('playwright');
const readline = require('readline');

// 初始化浏览器和页面
(async () => {
    const browser = await chromium.launch({ headless: false }); // 启动可见浏览器
    const page = await browser.newPage();
    await page.goto('https://playwright.dev/'); // 默认打开某个页面，可修改

    // 设置 readline 接口，用于接收用户输入
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('浏览器已启动，输入 Playwright 命令（例如 page.click("text=Login")）：');
    rl.on('line', async (input) => {
        if (input === 'exit') {
            await browser.close();
            rl.close();
            return;
        }
        try {
            // 动态执行用户输入的代码，绑定到当前 page 对象
            const result = await eval(`(async () => { return await ${input}; })()`);
            console.log('结果:', result);
        } catch (e) {
            console.error('错误:', e);
        }
        console.log('输入下一条命令：');
    });

    // 捕获进程结束信号，清理资源
    process.on('SIGINT', async () => {
        await browser.close();
        rl.close();
        process.exit();
    });
})();