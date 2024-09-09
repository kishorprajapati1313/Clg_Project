import React from 'react'

export const Admin_Model = () => {
    return (
        <>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Document</title>
                    <script type="importmap">
                        {
                            "imports" = {
                            "three": "https://unpkg.com/three@<version>/build/three.module.js",
                            "three/addons/": "https://unpkg.com/three@<version>/examples/jsm/"
                            }
                        }
                    </script>
                </head>
                <body>
                    <h1>3dmodel</h1>

                    <main>
                        <div className='container'></div>
                    </main>

                    <script type="module" src="js/main.js"></script>

                </body>
            </html>
        </>
    )
}
