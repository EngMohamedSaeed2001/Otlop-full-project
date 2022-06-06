package com.resturant.project.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "user_details")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
	private long id;

	private String username;
	private String email;
	private String password;
	private String phone = "00000000000";
	@OneToOne
	@JoinColumn(name = "profile_id")
	private Profile profile;
	private boolean active = false;
	private boolean suspended = false;
	private String img;

}
