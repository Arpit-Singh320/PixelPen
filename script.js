// Particle.js initialization
particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#00d8ff"
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
        }
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 5,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#00d8ff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false
        }
      }
    },
    interactivity: {
      detect_on: "window",
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        },
        onclick: {
          enable: true,
          mode: "push"
        }
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });
  
  // Handle image upload and API call
  document.getElementById("image-form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const imageInput = document.getElementById("image-input");
    const preview = document.getElementById("preview");
    const caption = document.getElementById("caption");
    const resultDiv = document.getElementById("result");
    const file = imageInput.files[0];
  
    if (!file) {
      caption.textContent = "Please select an image!";
      return;
    }
  
    // Show image preview
    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      resultDiv.style.display = "block";
    };
    reader.readAsDataURL(file);
  
    // Call the API
    caption.textContent = "Generating caption...";
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
        {
          headers: {
            Authorization: "Bearer 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",
          },
          method: "POST",
          body: file,
        }
      );
  
      if (!response.ok) {
        throw new Error("Error in API call");
      }
  
      const result = await response.json();
      if (result && result.length > 0) {
        caption.textContent = `Caption: ${result[0].generated_text}`;
      } else {
        caption.textContent = "No caption generated.";
      }
    } catch (error) {
      caption.textContent = `Error: ${error.message}`;
    }
  });
  
