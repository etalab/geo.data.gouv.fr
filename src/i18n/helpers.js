export const injectLocale = (i18n, { locale, namespace, resources }) => {
  if (!i18n.hasResourceBundle(locale, namespace)) {
    i18n.addResourceBundle(locale, namespace, resources)
  }
}
