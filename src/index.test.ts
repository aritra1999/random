import { describe, it, expect } from 'vitest';
import { getLocation } from '$lib/utils/utils';
describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});

describe('utils' , () => {
	describe('src/lib/utils/utils.ts', () => {
		it('getLocation', () => {
			expect(getLocation('link', 'test')).toEqual('test');
			expect(getLocation('blog', 'testBlogPath')).toEqual('/blog/testBlogPath');
			expect(getLocation('application', 'testAppPath')).toEqual('/app/testAppPath');
			expect(getLocation('game', 'testGamePath')).toEqual('/app/testGamePath');
			expect(getLocation('gist', 'testGist')).toEqual('');
			expect(getLocation('test', 'test')).toEqual('');
		});			
	});
});
