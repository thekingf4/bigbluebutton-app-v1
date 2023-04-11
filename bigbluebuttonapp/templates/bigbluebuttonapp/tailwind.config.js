module.exports = {
    purge: {
        enabled: false,
        content: [
            './index.html',
        ],
    },
    corePlugins: {
        preflight: false,
        container: false,
    },
    theme: {
        extend: {},
        fontFamily: {
            'sans': ["Open Sans", "Helvetica Neue", 'Helvetica', 'Arial', 'sans-serif'],
        }
    },
    variants: {},
    plugins: [],
    // important: "div.chat-app"
}