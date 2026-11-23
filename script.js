const createApp =
    window.Vue &&
    window.Vue.createApp;

const API_BASE =
    window.KTM_API_BASE ||
    (window.location.protocol === "file:"
        ? "http://localhost:8080/api/"
        : "/ktm390_backend/api/");

const appRoot = document.getElementById("app");

if(appRoot && createApp){

    createApp({

    data(){

        return{

            loading:true,

            menuOpen:false,

            activeTech:0,

            testRide:false,

            modelDetails:null,

            message:"",

            submitting:false,

            rideMessage:"",

            rideSubmitting:false,

            bookingReturnUrl:"",


            ride:{
                model:"KTM 390 Adventure",
                name:"",
                phone:"",
                city:"",
                email:"",
                date:"",
                preferred_time:""
            },


            form:{
                name:"",
                email:"",
                phone:"",
                model:""
            },


            performance:[

                {
                    number:"01",
                    icon:"⚡",
                    title:"PERFORMANCE",
                    text:"Responsive power and strong low-end torque for exciting road and adventure riding."
                },

                {
                    number:"02",
                    icon:"🎯",
                    title:"CONTROL",
                    text:"Electronic assistance and chassis-focused engineering designed around rider confidence."
                },

                {
                    number:"03",
                    icon:"🏔️",
                    title:"ADVENTURE",
                    text:"A motorcycle concept designed to move from everyday roads toward challenging terrain."
                },

                {
                    number:"04",
                    icon:"🔥",
                    title:"AGILITY",
                    text:"Rally-inspired ergonomics and lightweight adventure character help create an agile riding experience."
                }

            ],


            technologies:[

                {
                    name:"3 RIDE MODES",
                    icon:"⚙️",
                    description:"The current KTM India page describes multiple ride modes for adapting the motorcycle's character to different riding situations."
                },

                {
                    name:"CORNERING ABS",
                    icon:"🛞",
                    description:"Cornering ABS is part of the electronic assistance package listed by KTM India for the 390 Adventure."
                },

                {
                    name:"TRACTION CONTROL",
                    icon:"🎯",
                    description:"Traction control is designed to help manage rear-wheel traction during changing riding conditions."
                },

                {
                    name:"CRUISE CONTROL",
                    icon:"🛣️",
                    description:"Cruise control is highlighted by KTM India as a feature for longer-distance touring."
                },

                {
                    name:"QUICKSHIFTER+",
                    icon:"⚡",
                    description:"Quickshifter+ is listed among the motorcycle's electronic and riding-assistance features."
                },

                {
                    name:"OFF-ROAD ABS",
                    icon:"🏔️",
                    description:"Off-road ABS is designed for adventure riding conditions and is listed among the motorcycle's electronic aids."
                }

            ],


            features:[

                {
                    icon:"💡",
                    title:"LED HEADLAMP",
                    text:"Modern LED lighting."
                },

                {
                    icon:"📺",
                    title:"5 INCH TFT",
                    text:"Digital information display."
                },

                {
                    icon:"🔌",
                    title:"USB CHARGER",
                    text:"Convenient device charging."
                },

                {
                    icon:"🛞",
                    title:"19 / 17 WHEELS",
                    text:"Adventure-focused wheel setup."
                }

            ],


            specifications:[

                {
                    name:"ENGINE DISPLACEMENT",
                    value:"349.32 CC"
                },

                {
                    name:"ENGINE",
                    value:"4-STROKE SINGLE CYLINDER DOHC"
                },

                {
                    name:"MAX POWER",
                    value:"41.5 PS @ 8600 RPM"
                },

                {
                    name:"MAX TORQUE",
                    value:"33.5 NM @ 7000 RPM"
                },

                {
                    name:"GROUND CLEARANCE",
                    value:"228 MM"
                },

                {
                    name:"SADDLE HEIGHT",
                    value:"825 MM"
                },

                {
                    name:"KERB WEIGHT",
                    value:"181 KG"
                },

                {
                    name:"FUEL TANK",
                    value:"14.5 L"
                },

                {
                    name:"FRONT / REAR TRAVEL",
                    value:"200 / 205 MM"
                },

                {
                    name:"WHEELBASE",
                    value:"1470 MM"
                },

                {
                    name:"DISPLAY",
                    value:"5 INCH TFT"
                },

                {
                    name:"BRAKES",
                    value:"320 MM / 240 MM"
                }

            ],


            colors:[

                {
                    name:"ARCTIC FLARE",
                    code:"#e8edf0"
                },

                {
                    name:"EBONY BLACK",
                    code:"#111111"
                },

                {
                    name:"KTM ORANGE",
                    code:"#ff5b00"
                }

            ],


            selectedColor:{

                name:"ARCTIC FLARE",

                code:"#e8edf0"

            },

            models:{

                adventure:{
                    title:"390 Adventure",
                    bookingModel:"KTM 390 Adventure",
                    kicker:"BASE ADVENTURE MODEL",
                    image:"bike2.webp",
                    description:"A versatile middleweight adventure motorcycle for city commuting, weekend touring and roads that turn rough.",
                    stats:["349.32 CC", "41.5 PS", "33.5 NM"],
                    features:[
                        "Ride modes and 5-inch TFT display",
                        "Adventure-focused 19 / 17 wheel setup",
                        "Long-travel suspension and upright ergonomics"
                    ]
                },

                enduro:{
                    title:"390 Enduro",
                    bookingModel:"KTM 390 Enduro",
                    kicker:"TRAIL-FOCUSED CONCEPT",
                    image:"images%20(1).jpg",
                    description:"A trail-led 390 concept with an emphasis on ground clearance, control and confidence when the route gets unpredictable.",
                    stats:["390 PLATFORM", "OFF-ROAD ABS", "TRAIL READY"],
                    features:[
                        "High-clearance, off-road-oriented stance",
                        "Wider trail focus with balanced chassis control",
                        "Rally-inspired ergonomics for standing riding"
                    ]
                }

            }

        };

    },


    methods:{

        showModelDetails(model){

            this.modelDetails=this.models[model] || null;

        },


        openBooking(model="KTM 390 Adventure"){

            this.modelDetails=null;
            this.rideMessage="";
            this.ride.model=model;
            this.testRide=true;

        },


        dismissBooking(){

            this.testRide=false;

        },


        goBackFromBooking(){

            if(this.bookingReturnUrl){

                window.location.href=this.bookingReturnUrl;

                return;

            }

            this.dismissBooking();

        },


        scrollToSection(id){

            const element =
                document.getElementById(id);

            if(element){

                element.scrollIntoView({
                    behavior:"smooth"
                });

            }

        },


        async submitForm(){

            this.submitting=true;
            this.message="";

            try{

                const response = await fetch(
                    API_BASE + "contact.php",
                    {
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            name:this.form.name,
                            email:this.form.email,
                            phone:this.form.phone,
                            message:"Enquiry about " + this.form.model
                        })
                    }
                );

                const data = await response.json();

                if(!response.ok || !data.success){
                    throw new Error(
                        data.message ||
                        "Could not send your enquiry."
                    );
                }

                this.message=data.message;

                this.form={
                    name:"",
                    email:"",
                    phone:"",
                    model:""
                };

            }catch(error){

                this.message=
                    error.message ||
                    "Backend unavailable. Please try again.";

            }finally{

                this.submitting=false;

            }

        },


        async bookRide(){

            if(
                !this.ride.name ||
                !this.ride.phone ||
                !this.ride.model ||
                !this.ride.city ||
                !this.ride.date
            ){

                this.rideMessage =
                    "Please complete your model, name, phone, city and date.";

                return;

            }

            this.rideSubmitting=true;
            this.rideMessage="";

            try{

                const response = await fetch(
                    API_BASE + "test-ride.php",
                    {
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            model:this.ride.model,
                            name:this.ride.name,
                            email:this.ride.email,
                            phone:this.ride.phone,
                            city:this.ride.city,
                            date:this.ride.date,
                            preferred_time:this.ride.preferred_time
                        })
                    }
                );

                const data = await response.json();

                if(!response.ok || !data.success){
                    throw new Error(
                        data.message ||
                        "Could not submit your test ride request."
                    );
                }

                this.rideMessage=data.message;

                setTimeout(()=>{

                    this.testRide=false;

                    this.rideMessage="";

                    this.ride={
                        model:"KTM 390 Adventure",
                        name:"",
                        phone:"",
                        city:"",
                        email:"",
                        date:"",
                        preferred_time:""
                    };

                },2500);

            }catch(error){

                this.rideMessage=
                    error.message ||
                    "Backend unavailable. Please try again.";

            }finally{

                this.rideSubmitting=false;

            }

        },


        initThree(){

            const canvas =
                document.getElementById(
                    "threeCanvas"
                );


            if(!canvas){
                return;
            }


            const scene =
                new THREE.Scene();


            scene.fog =
                new THREE.FogExp2(
                    0x050505,
                    0.035
                );


            const camera =
                new THREE.PerspectiveCamera(
                    45,
                    window.innerWidth /
                    window.innerHeight,
                    0.1,
                    1000
                );


            camera.position.z=8;


            const renderer =
                new THREE.WebGLRenderer({

                    canvas:canvas,

                    antialias:true,

                    alpha:true

                });


            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio,
                    2
                )
            );


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );


            /*
             * 3D ADVENTURE OBJECT
             *
             * This is a stylized WebGL
             * motorcycle representation.
             *
             * Replace this object with
             * an authorized GLB/GLTF
             * motorcycle model for a
             * true production 3D bike.
             */


            const bikeGroup =
                new THREE.Group();


            scene.add(bikeGroup);


            /* MAIN BODY */

            const bodyGeometry =
                new THREE.BoxGeometry(
                    3.2,
                    .7,
                    1.1
                );


            const bodyMaterial =
                new THREE.MeshStandardMaterial({

                    color:0xff5b00,

                    metalness:.7,

                    roughness:.25

                });


            const body =
                new THREE.Mesh(
                    bodyGeometry,
                    bodyMaterial
                );


            body.position.y=0.7;

            body.rotation.z=-.08;

            bikeGroup.add(body);


            /* TANK */

            const tankGeometry =
                new THREE.SphereGeometry(
                    .9,
                    32,
                    32
                );


            const tank =
                new THREE.Mesh(
                    tankGeometry,
                    bodyMaterial
                );


            tank.scale.set(
                1.4,
                .55,
                .8
            );


            tank.position.set(
                .2,
                1.15,
                0
            );


            bikeGroup.add(tank);


            /* ENGINE */

            const engineGeometry =
                new THREE.BoxGeometry(
                    1.1,
                    1.1,
                    .9
                );


            const engineMaterial =
                new THREE.MeshStandardMaterial({

                    color:0x252525,

                    metalness:.8,

                    roughness:.5

                });


            const engine =
                new THREE.Mesh(
                    engineGeometry,
                    engineMaterial
                );


            engine.position.set(
                -.4,
                -.05,
                0
            );


            bikeGroup.add(engine);


            /* WHEELS */

            const wheelGeometry =
                new THREE.TorusGeometry(
                    .95,
                    .14,
                    16,
                    40
                );


            const wheelMaterial =
                new THREE.MeshStandardMaterial({

                    color:0x080808,

                    metalness:.6,

                    roughness:.35

                });


            const rearWheel =
                new THREE.Mesh(
                    wheelGeometry,
                    wheelMaterial
                );


            rearWheel.rotation.y=
                Math.PI/2;


            rearWheel.position.set(
                -1.5,
                -.8,
                0
            );


            bikeGroup.add(
                rearWheel
            );


            const frontWheel =
                rearWheel.clone();


            frontWheel.position.x=
                1.6;


            bikeGroup.add(
                frontWheel
            );


            /* WHEEL HUBS */

            const hubGeometry =
                new THREE.CylinderGeometry(
                    .15,
                    .15,
                    .4,
                    20
                );


            const hubMaterial =
                new THREE.MeshStandardMaterial({

                    color:0xff5b00,

                    metalness:.8,

                    roughness:.2

                });


            const rearHub =
                new THREE.Mesh(
                    hubGeometry,
                    hubMaterial
                );


            rearHub.rotation.z=
                Math.PI/2;


            rearHub.position.set(
                -1.5,
                -.8,
                0
            );


            bikeGroup.add(
                rearHub
            );


            const frontHub =
                rearHub.clone();


            frontHub.position.x=
                1.6;


            bikeGroup.add(
                frontHub
            );


            /* FRONT FORK */

            const forkGeometry =
                new THREE.CylinderGeometry(
                    .07,
                    .07,
                    2.1,
                    12
                );


            const forkMaterial =
                new THREE.MeshStandardMaterial({

                    color:0xc8c8c8,

                    metalness:.9,

                    roughness:.2

                });


            const fork =
                new THREE.Mesh(
                    forkGeometry,
                    forkMaterial
                );


            fork.position.set(
                1.5,
                .25,
                0
            );


            fork.rotation.z=
                -.25;


            bikeGroup.add(
                fork
            );


            /* HANDLE */

            const handleGeometry =
                new THREE.CylinderGeometry(
                    .05,
                    .05,
                    1.5,
                    12
                );


            const handle =
                new THREE.Mesh(
                    handleGeometry,
                    engineMaterial
                );


            handle.rotation.z=
                Math.PI/2;


            handle.position.set(
                1.2,
                1.7,
                0
            );


            bikeGroup.add(
                handle
            );


            /* HEADLIGHT */

            const lightGeometry =
                new THREE.BoxGeometry(
                    .45,
                    .35,
                    .25
                );


            const lightMaterial =
                new THREE.MeshStandardMaterial({

                    color:0xffffff,

                    emissive:0xffffff,

                    emissiveIntensity:2

                });


            const headlight =
                new THREE.Mesh(
                    lightGeometry,
                    lightMaterial
                );


            headlight.position.set(
                1.85,
                1.1,
                0
            );


            bikeGroup.add(
                headlight
            );


            /* GROUND */

            const groundGeometry =
                new THREE.PlaneGeometry(
                    30,
                    30
                );


            const groundMaterial =
                new THREE.MeshStandardMaterial({

                    color:0x050505,

                    metalness:.2,

                    roughness:.9

                });


            const ground =
                new THREE.Mesh(
                    groundGeometry,
                    groundMaterial
                );


            ground.rotation.x=
                -Math.PI/2;


            ground.position.y=
                -1.8;


            scene.add(
                ground
            );


            /* LIGHTING */

            const orangeLight =
                new THREE.PointLight(
                    0xff5b00,
                    80,
                    20
                );


            orangeLight.position.set(
                4,
                3,
                4
            );


            scene.add(
                orangeLight
            );


            const whiteLight =
                new THREE.PointLight(
                    0xffffff,
                    60,
                    20
                );


            whiteLight.position.set(
                -4,
                3,
                3
            );


            scene.add(
                whiteLight
            );


            const ambient =
                new THREE.AmbientLight(
                    0xffffff,
                    .35
                );


            scene.add(
                ambient
            );


            /* PARTICLES */

            const particleCount=900;


            const particleGeometry =
                new THREE.BufferGeometry();


            const positions =
                new Float32Array(
                    particleCount*3
                );


            for(
                let i=0;
                i<particleCount*3;
                i++
            ){

                positions[i]=
                    (Math.random()-.5)*30;

            }


            particleGeometry.setAttribute(

                "position",

                new THREE.BufferAttribute(
                    positions,
                    3
                )

            );


            const particleMaterial =
                new THREE.PointsMaterial({

                    color:0xff5b00,

                    size:.025,

                    transparent:true,

                    opacity:.7

                });


            const particles =
                new THREE.Points(
                    particleGeometry,
                    particleMaterial
                );


            scene.add(particles);


            /* SCROLL */

            let scrollProgress=0;


            window.addEventListener(
                "scroll",
                ()=>{

                    const maxScroll =
                        document.body.scrollHeight -
                        window.innerHeight;


                    scrollProgress =
                        window.scrollY /
                        maxScroll;

                }
            );


            /* MOUSE */

            let mouseX=0;

            let mouseY=0;


            window.addEventListener(
                "mousemove",
                event=>{

                    mouseX =
                        (event.clientX /
                        window.innerWidth-
                        .5);

                    mouseY =
                        (event.clientY /
                        window.innerHeight-
                        .5);

                }
            );


            /* ANIMATION */

            const animate=()=>{

                requestAnimationFrame(
                    animate
                );


                /*
                 * 4D-STYLE MOTION
                 *
                 * Scroll controls the
                 * camera and motorcycle.
                 */

                const targetRotation =
                    scrollProgress *
                    Math.PI *
                    4;

                const driftX = mouseX * 1.8;
                const driftY = -mouseY * 1.4;

                bikeGroup.rotation.y +=
                    (
                        targetRotation +
                        mouseX * 1.4 -
                        bikeGroup.rotation.y
                    )*.035;


                bikeGroup.rotation.x +=
                    (
                        mouseY*.6 -
                        bikeGroup.rotation.x
                    )*.03;


                bikeGroup.rotation.z +=
                    (
                        mouseX*.45 -
                        bikeGroup.rotation.z
                    )*.03;


                bikeGroup.position.y =
                    Math.sin(
                        Date.now()*.0015
                    )*.12 +
                    mouseY * .6;

                bikeGroup.position.x =
                    driftX * .6;

                rearWheel.rotation.z +=
                    0.03;

                frontWheel.rotation.z +=
                    0.03;

                camera.position.x +=
                    (
                        driftX*1.5 -
                        camera.position.x
                    )*.02;


                camera.position.y +=
                    (
                        driftY -
                        camera.position.y
                    )*.02;

                camera.position.z +=
                    (
                        8 +
                        Math.sin(Date.now()*0.001) * .2 -
                        camera.position.z
                    )*.02;


                camera.lookAt(
                    0,
                    0,
                    0
                );


                particles.rotation.y +=
                    .0012;

                particles.rotation.x +=
                    .0004;


                renderer.render(
                    scene,
                    camera
                );

            };


            animate();


            /* RESIZE */

            window.addEventListener(
                "resize",
                ()=>{

                    camera.aspect =
                        window.innerWidth /
                        window.innerHeight;


                    camera.updateProjectionMatrix();


                    renderer.setSize(
                        window.innerWidth,
                        window.innerHeight
                    );

                }
            );

        }

    },


    mounted(){

        setTimeout(()=>{

            this.loading=false;

        },1800);


        this.$nextTick(()=>{

            this.initThree();

        });

        const bookingQuery =
            new URLSearchParams(window.location.search);

        const bookingModel =
            bookingQuery.get("book");

        const bookingReturnUrl =
            bookingQuery.get("return");

        if(bookingReturnUrl && /^[a-z0-9-]+\.html$/i.test(bookingReturnUrl)){

            this.bookingReturnUrl=bookingReturnUrl;

        }

        const bookingModels={
            adventure:"KTM 390 Adventure",
            adventurex:"KTM 390 Adventure X",
            enduro:"KTM 390 Enduro",
            duke:"KTM 390 Duke"
        };

        if(bookingModel && bookingModels[bookingModel]){

            this.openBooking(bookingModels[bookingModel]);

        }

    }

    }).mount(appRoot);

}


document.querySelectorAll(".navbar").forEach(navbar=>{

    const menu=navbar.querySelector(".menu");
    const nav=navbar.querySelector("nav");

    if(!menu || !nav){
        return;
    }

    if(!navbar.querySelector(".nav-back")){

        const backButton=document.createElement("button");

        backButton.className="nav-back";
        backButton.type="button";
        backButton.textContent="BACK";
        backButton.setAttribute("aria-label", "Go back to the previous page");

        backButton.addEventListener("click", ()=>{

            if(document.referrer && window.history.length>1){

                window.history.back();

                return;

            }

            window.location.href="index.html";

        });

        navbar.insertBefore(backButton, menu);

    }

    menu.setAttribute("aria-expanded", "false");

    menu.addEventListener("click", ()=>{

        const isOpen=nav.classList.toggle("open");
        menu.setAttribute("aria-expanded", String(isOpen));

    });

    nav.querySelectorAll("a").forEach(link=>{

        link.addEventListener("click", ()=>{

            nav.classList.remove("open");
            menu.setAttribute("aria-expanded", "false");

        });

    });

});
