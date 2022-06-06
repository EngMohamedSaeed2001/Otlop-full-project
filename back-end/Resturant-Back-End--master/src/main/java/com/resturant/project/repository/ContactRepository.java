package com.resturant.project.repository;

import com.resturant.project.model.entity.ContactUs;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<ContactUs,Long> {
}
