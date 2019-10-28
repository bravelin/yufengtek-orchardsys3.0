<template>
    <div class="sphere"></div>
</template>
<script>
    import * as THREE from 'three'

    const PI = Math.PI
    const BLINT_SPEED = 0.05
    const RADIUS = 100
    const imgUrl = {
        dot: './imgs/earth/dot.png',
        earth: './imgs/earth/earth.jpg',
        clouds: './imgs/earth/clouds.jpg',
        disc: './imgs/earth/disc.png'
    }
    let aniRequestId = null
    let scene = null // 场景
    let camera = null // 相机
    let renderer = null

    let earthImg = null
    let earthData = null
    let earthImgData = null
    let earthParticles = new THREE.Object3D()
    const cloud = new THREE.Object3D()
    let dotTexture = new THREE.TextureLoader().load(imgUrl.dot)

    const tracks = [] // 轨道对象
    const starGroups = [] // 沿着轨道的白色星星
    export default {
        name: 'LoginSphere',
        mounted () {
            const that = this
            that.$nextTick(() => {
                that.init()
            })
        },
        methods: {
            // 初始化
            init () {
                const that = this
                earthImg = new Image()
                earthImg.src = imgUrl.earth
                earthImg.onload = function () {
                    const earthCanvas = document.createElement('canvas')
                    const ctx = earthCanvas.getContext('2d')
                    const imgWidth = this.width
                    const imgHeight = this.height
                    earthCanvas.width = imgWidth
                    earthCanvas.height = imgHeight
                    ctx.drawImage(earthImg, 0, 0, imgWidth, imgHeight)
                    earthImgData = ctx.getImageData(0, 0, imgWidth, imgHeight)
                    that.createScene()
                    that.createObjects()
                    that.createEarthParticles()
                    that.createCloudGrid()
                    renderer.render(scene, camera)
                    that.animate()
                }
            },
            createScene () {
                const that = this
                const winWidth = document.documentElement.clientWidth || window.innerWidth
                const winHeight = document.documentElement.clientHeight || window.innerHeight
                scene = new THREE.Scene()
                camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 0.1, 10000)
                camera.position.z = 550
                renderer = new THREE.WebGLRenderer({ antialias: true })
                renderer.setSize(winWidth, winHeight)
                renderer.autoClearColor = new THREE.Color(1, 0, 0, 0)
                that.$el.appendChild(renderer.domElement)
            },
            createObjects () {
                const that = this
                that.createTracks()
                that.createPlanets()
            },
            // 轨道虚线
            createTracks () {
                const trackDatas = [
                    { color: 0x006a6f, dashSize: 1, gapSize: 3, xRadius: 140, yRadius: 50, rotate: -PI * 0.1 },
                    { color: 0x005e68, dashSize: 1.2, gapSize: 3, xRadius: 155, yRadius: 60, rotate: -PI * 0.15 },
                    { color: 0x005d66, dashSize: 1, gapSize: 3, xRadius: 165, yRadius: 70, rotate: -PI * 0.22 }
                ]
                let material = null
                let ellipse = null
                let ellipsePath = null
                let ellipseGeometry = null
                let line = null
                trackDatas.forEach(({ color, dashSize, gapSize, xRadius, yRadius, rotate }) => {
                    material = new THREE.LineDashedMaterial({ color, dashSize, gapSize })
                    ellipse = new THREE.EllipseCurve(0, 0, xRadius, yRadius, 0, 2.0 * PI, false, rotate)
                    ellipsePath = new THREE.CurvePath()
                    ellipsePath.add(ellipse)
                    ellipseGeometry = ellipsePath.createPointsGeometry(100)
                    line = new THREE.Line(ellipseGeometry, material)
                    line.computeLineDistances()
                    scene.add(line)
                    tracks.push(line)
                })
            },
            // 小行星
            createPlanets () {
                const that = this
                const stars = [
                    { dashSize: 20, gapSize: 150, xRadius: 145, yRadius: 55, rotate: PI * 0.1 },
                    { dashSize: 10, gapSize: 160, xRadius: 158, yRadius: 65, rotate: PI * 0.25 },
                    { dashSize: 10, gapSize: 170, xRadius: 168, yRadius: 75, rotate: PI * 0.5 },
                    { dashSize: 10, gapSize: 170, xRadius: 168, yRadius: 75, rotate: 0 }
                ]
                let vertices = null
                let positions = null
                let colors = null
                let sizes = null
                let vertex = null
                let len = 0
                let vLen = 0
                let color = new THREE.Color()
                const particleSize = 30
                let geometry = null
                let particles = null
                let ellipsePath = null
                let ellipseGeometry = null
                const material = new THREE.ShaderMaterial({
                    uniforms: {
                        color: { value: new THREE.Color(0xffffff) },
                        pointTexture: { value: new THREE.TextureLoader().load(imgUrl.disc) }
                    },
                    vertexShader: `attribute float size;
                                attribute vec3 customColor;
                                varying vec3 vColor;
                                void main() {
                                    vColor = customColor;
                                    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                                    gl_PointSize = size * ( 300.0 / -mvPosition.z );
                                    gl_Position = projectionMatrix * mvPosition;
			                    }`,
                    fragmentShader: `uniform vec3 color;
                                    uniform sampler2D pointTexture;
                                    varying vec3 vColor;
                                    void main() {
                                        gl_FragColor = vec4( color * vColor, 1.0 );
                                        gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
                                        if ( gl_FragColor.a < ALPHATEST ) discard;
                                    }`,
                    alphaTest: 0.9
                })
                stars.forEach(({ dashSize, gapSize, xRadius, yRadius, rotate }) => {
                    ellipsePath = new THREE.CurvePath()
                    ellipsePath.add(new THREE.EllipseCurve(0, 0, xRadius, yRadius, 0, 2.0 * PI, false, rotate))
                    ellipseGeometry = ellipsePath.createPointsGeometry(70)
                    vertices = [...ellipseGeometry.vertices]
                    vLen = vertices.length
                    for (let i = vLen - 1; i >= 0; i--) {
                        if (i % 2 == 0) {
                            vertices.splice(i, 1)
                        }
                    }
                    vLen = vertices.length
                    len =  vLen * 3
                    positions = new Float32Array(len)
                    colors = new Float32Array(len)
                    sizes = new Float32Array(len)
                    for (let i = 0; i < vLen; i++) {
                        vertex = vertices[i]
                        vertex.toArray(positions, i * 3)
                        color.setHSL(0.508, 0.1835, 0.29608 + 0.3 * (i / vLen))
                        color.toArray(colors, i * 3)
                        sizes[i] = particleSize * 0.5
                    }
                    geometry = new THREE.BufferGeometry()
                    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3))
				    geometry.addAttribute('customColor', new THREE.BufferAttribute(colors, 3))
                    geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1))
                    particles = new THREE.Points(geometry, material)
                    scene.add(particles)
                    starGroups.push(particles)
                })
            },
            createEarthParticles () {
                const that = this
                const positions = []
                const materials = []
                const sizes = []
                let mat = null
                for (let i = 0; i < 2; i++) {
                    positions[i] = {
                        positions: []
                    }
                    sizes[i] = {
                        sizes: []
                    }
                    mat = new THREE.PointsMaterial()
                    mat.size = 5
                    mat.color = new THREE.Color(0x0d7b7f)
                    mat.map = dotTexture
                    mat.depthWrite = false
                    mat.transparent = true
                    mat.opacity = 0
                    mat.side = THREE.FrontSide
                    mat.blending = THREE.AdditiveBlending
                    let n = i / 2
                    mat._t = n * Math.PI * 2
                    mat._speed = BLINT_SPEED
                    mat._min = 0.2 * Math.random() + 0.5
                    mat._delta = 0.1 * Math.random() + 0.1
                    mat._opacity_coef = 1
                    materials.push(mat)
                }
                const spherical = new THREE.Spherical()
                spherical.radius = RADIUS
                const step = 250
                let vec = null
                let radians = 0

                for (let i = 0; i < step; i++) {
                    vec = new THREE.Vector3()
                    radians = step * (1 - Math.sin(i / step * Math.PI)) / step + 0.5 // 每个纬线圈内的角度均分
                    let c = 0
                    let f = 0
                    let index = 0
                    let pos = 0
                    let size = 0
                    for (let j = 0; j < step; j += radians) {
                        c = j / step // 底图上的横向百分比
                        f = i / step // 底图上的纵向百分比
                        index = Math.floor(2 * Math.random())
                        pos = positions[index]
                        size = sizes[index]
                        if (that.isLandByUV(c, f)) { // 根据横纵百分比判断在底图中的像素值
                            spherical.theta = c * Math.PI * 2 - Math.PI / 2 // 横纵百分比转换为theta和phi夹角
                            spherical.phi = f * Math.PI // 横纵百分比转换为theta和phi夹角
                            vec.setFromSpherical(spherical) // 夹角转换为世界坐标
                            pos.positions.push(vec.x)
                            pos.positions.push(vec.y)
                            pos.positions.push(vec.z)
                            if (j % 3 === 0) {
                                size.sizes.push(6.0)
                            }
                        }
                    }
                }

                let pos = null
                let size = null
                let bufferGeom = null
                let typedArr1 = null
                let typedArr2 = null
                let j = 0
                for (let i = 0; i < positions.length; i++) {
                    pos = positions[i]
                    size = sizes[i]
                    bufferGeom = new THREE.BufferGeometry()
                    typedArr1 = new Float32Array(pos.positions.length)
                    typedArr2 = new Float32Array(size.sizes.length)
                    for (j = 0; j < pos.positions.length; j++) {
                        typedArr1[j] = pos.positions[j]
                    }
                    for (j = 0; j < size.sizes.length; j++) {
                        typedArr2[j] = size.sizes[j]
                    }
                    bufferGeom.addAttribute('position', new THREE.BufferAttribute(typedArr1, 3))
                    bufferGeom.addAttribute('size', new THREE.BufferAttribute(typedArr2, 1))
                    bufferGeom.computeBoundingSphere()
                    earthParticles.add(new THREE.Points(bufferGeom, materials[i]))
                }
                scene.add(earthParticles)
            },
            isLandByUV (c, f) {
                let n = parseInt(earthImg.width * c) // 根据横纵百分比计算图象坐标系中的坐标
                let o = parseInt(earthImg.height * f) // 根据横纵百分比计算图象坐标系中的坐标
                return earthImgData.data[4 * (o * earthImgData.width + n)] === 0 // 查找底图中对应像素点的rgba值并判断
            },
            createCloudGrid () {
                THREE.XRayMaterial = function (options) {
                    const uniforms = {
                        uTex: {
                            type: 't',
                            value: options.map || new THREE.Texture()
                        },
                        offsetRepeat: {
                            value: new THREE.Vector4(0, 0, 1, 1)
                        },
                        alphaProportion: {
                            type: '1f',
                            value: options.alphaProportion || 0.5
                        },
                        diffuse: {
                            value: options.color || new THREE.Color(16777215)
                        },
                        opacity: {
                            value: options.opacity || 1
                        },
                        gridOffset: {
                            value: 0
                        }
                    }
                    return new THREE.ShaderMaterial({
                            uniforms,
                            vertexShader: `
                                varying float _alpha;
                                varying vec2 vUv;
                                uniform vec4 offsetRepeat;
                                uniform float alphaProportion;
                                void main() {
                                    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                                    vUv = uv * offsetRepeat.zw + offsetRepeat.xy;
                                    vec4 worldPosition = modelMatrix * vec4( vec3( position ), 1.0 );
                                    vec3 cameraToVertex = normalize( cameraPosition - worldPosition.xyz);
                                    _alpha = 1.0 - max( 0.0, dot( normal, cameraToVertex ) );
                                    _alpha = max( 0.0, (_alpha - alphaProportion) / (1.0 - alphaProportion) );
                                }`,
                            fragmentShader: `
                                uniform sampler2D uTex;
                                uniform vec3 diffuse;
                                uniform float opacity;
                                uniform float gridOffset;
                                varying float _alpha;
                                varying vec2 vUv;
                                void main() {
                                    vec4 texColor = texture2D( uTex, vUv );
                                    float _a = _alpha * opacity;
                                    if( _a <= 0.0 ) discard;
                                    _a = _a * ( sin( vUv.y * 2000.0 + gridOffset ) * .5 + .5 );
                                    gl_FragColor = vec4( texColor.rgb * diffuse, _a );
                                }`,
                            transparent: !0,
                            blending: THREE.AdditiveBlending,
                            depthTest: !1
                    })
                }
                const geometry = new THREE.SphereGeometry(1.1 * RADIUS, 66, 44)
                const map = new THREE.TextureLoader().load(imgUrl.clouds)
                map.wrapT = THREE.ClampToEdgeWrapping
                map.wrapS = THREE.ClampToEdgeWrapping
                /* eslint-disable */
                const material = new THREE.XRayMaterial({
                    map,
                    alphaProportion: 0.25,
                    color: new THREE.Color(0x053f6b),
                    opacity: 0,
                    gridOffsetSpeed: 0.6
                })
                const mesh = new THREE.Mesh(geometry, material)
                mesh.matrixAutoUpdate = !1
                console.log('this cloud....', cloud)
                cloud.add(mesh)
                scene.add(cloud)
            },
            animate () {
                const that = this
                aniRequestId = requestAnimationFrame(that.animate)
                const objects = earthParticles.children
                let material = null
                objects.forEach(obj => {
                    material = obj.material
                    material._t += material._speed
                    material.opacity = (Math.sin(material._t) * material._delta + material._min) * material._opacity_coef
                    material.needsUpdate = true
                })
                let rotWorldMatrix = null
                let axis = new THREE.Vector3(0, 0, 1)
                starGroups.forEach(item => {
                    rotWorldMatrix = new THREE.Matrix4()
                    rotWorldMatrix.makeRotationAxis(axis.normalize(), Math.PI / 360)
                    rotWorldMatrix.multiply(item.matrix)
                    item.matrix = rotWorldMatrix
                    item.rotation.setFromRotationMatrix(item.matrix)
                })
                renderer.render(scene, camera)
            }
        }
    }
</script>
