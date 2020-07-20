import * as puppeteer from 'puppeteer';
import { INFLUX } from '@root/config';

export class DashboardManager {

	private browser!: puppeteer.Browser;

	public async Init() {
		this.browser = await puppeteer.launch({
			timeout: 0,
			defaultViewport: {
				width: 4096,
				height: 2160
			}
		});
	}

	private async login(page: puppeteer.Page) {
		await page.goto(INFLUX.BASE_URL, { waitUntil: 'networkidle2' });

		await page.type('[name=username]', INFLUX.INFLUX_LOGIN_USERNAME);
		await page.type('[name=password]', INFLUX.INFLUX_LOGIN_PASSWORD);
		await page.click('.cf-button-primary');

		await page.waitForNavigation({
			waitUntil: [
				'load',
				'domcontentloaded',
				'networkidle2'
			]
		});
	}

}
