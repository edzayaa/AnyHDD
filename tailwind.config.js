export default {
    prefix: 'tw-',
    
    content: [
        './resources/views/**/*.edge',
        './resources/js/**/*.js',
    ],

    corePlugins: {
        preflight: false,
    },

    plugins: [
        require('daisyui'),
    ],
   
    daisyui: {
        themes: ['light'],
        prefix: 'tw-',
    },
}
