/**
 * Digital Asset Links for the Play Store app (a Trusted Web Activity built with Bubblewrap or
 * PWABuilder). Android only hides the browser bar when this file lists the app's package and the
 * SHA-256 fingerprint of its signing key. Set both at build time:
 *   ANDROID_PACKAGE_NAME=dev.fourpeople.app
 *   ANDROID_CERT_FINGERPRINTS=AB:CD:…,12:34:…   (comma-separated; Play App Signing + upload key)
 * Without them the file is an empty list, which is valid and grants nothing.
 */
export const dynamic = 'force-static'

export function GET() {
	const packageName = process.env.ANDROID_PACKAGE_NAME
	const fingerprints = (process.env.ANDROID_CERT_FINGERPRINTS ?? '')
		.split(',')
		.map((value) => value.trim())
		.filter(Boolean)

	const statements =
		packageName && fingerprints.length > 0
			? [
					{
						relation: ['delegate_permission/common.handle_all_urls'],
						target: {
							namespace: 'android_app',
							package_name: packageName,
							sha256_cert_fingerprints: fingerprints,
						},
					},
				]
			: []

	return Response.json(statements, {
		headers: { 'Cache-Control': 'public, max-age=3600' },
	})
}
