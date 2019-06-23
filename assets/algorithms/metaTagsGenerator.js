const generateMetaTags = (
	siteName = '',
	title = '',
	author = '',
	description = '',
	keywords = '',
	copyright = '',
	languages = 'pt-br',
	initialScale = '1.0',
	minimumScale = '0.0',
	maximumScale = '2.0',
	userScalable = 'yes',
	shrinkToFit = 'yes',
	IDEorTextEditor = '',
	rating = 'general'
) => {
	return {
		"siteName": `<meta name="apple-mobile-web-app-title" content="${siteName}">\n<meta property="og:site_name" content="${siteName}">`,
		"title": `<title>${title}</title>`,
		"standards": `<meta http-equiv="content-type" content="text/html; charset=UTF-8" />\n<meta http-equiv="X-UA-Compatible" content="ie=edge">\n<meta property="og:type" content="website">`,
		"author": `<meta name="author" content="${author}">`,
		"metaTitle": `<meta name="title" content="${title}">`,
		"description": `<meta name="description" content="${description}">`,
		"keywords": `<meta name="keywords" content="${keywords}">`,
		"copyright": `<meta name="copyright" content="${copyright}">`,
		"contentLanguage": `<meta http-equiv="content-language" content="${languages}">`,
		"viewport": `<meta name="viewport" content="width=device-width, initial-scale=${initialScale}, minimum-scale=${minimumScale}, maximum-scale=${maximumScale}, user-scalable=${userScalable}, shrink-to-fit=${shrinkToFit}">`,
		"generator": `<meta name="generator" content="${IDEorTextEditor}">`,
		"rating": `<meta name="rating" content="${rating}">`
	}
}
