from django.test import TestCase


class InternationalizationTests(TestCase):
    def test_english_locale_route_loads_homepage(self):
        response = self.client.get('/en/')
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Home')
        self.assertContains(response, 'Contact us')

    def test_about_page_uses_translated_navigation(self):
        response = self.client.get('/en/about/')
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'About')
        self.assertContains(response, 'Contact')
