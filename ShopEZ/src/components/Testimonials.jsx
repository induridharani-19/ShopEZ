import "./Testimonials.css";

function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      rating: "★★★★★",
      review: "Excellent products and super fast delivery. Highly recommended!",
    },
    {
      name: "Priya Singh",
      rating: "★★★★★",
      review: "Very good quality products. Customer support is also amazing.",
    },
    {
      name: "Amit Kumar",
      rating: "★★★★☆",
      review: "Shopping experience was smooth and checkout was easy.",
    },
    {
      name: "Neha Verma",
      rating: "★★★★★",
      review: "Best online shopping website. I will definitely shop again.",
    },
  ];

  return (
    <section className="testimonials">
      <h2>⭐ What Our Customers Say</h2>

      <div className="testimonial-grid">
        {reviews.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <h3>{item.rating}</h3>
            <p>"{item.review}"</p>
            <h4>- {item.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;