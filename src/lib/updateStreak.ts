export async function UpdateStreak() {
    try {
      const res = await fetch('http://localhost:5000/api/updateStreak', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
      });

      if (res.status === 200) {
          console.log("Streak updated successfully");
      }
  } 
  catch (error) {
      console.log("Failed");
      console.error(error);
  }
  }